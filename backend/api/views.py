from django.shortcuts import render
from django.contrib.auth.hashers import make_password, check_password as django_check_password
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Token
from .serializers import UserSerializer, TokenSerializer
from django.conf import settings
from datetime import datetime, timedelta
import hashlib
import uuid
from django.utils import timezone
import re

SALT = "8b4f6b2cc1868d75ef79e5cfb8779c11b6a374bf0fce05b485581bf4e1e25b96c8c2855015de8449"
URL = "http://localhost:3000"

def mail_template(content, button_url, button_text):
    return f"""<!DOCTYPE html>
            <html>
            <body style="text-align: center; font-family: 'Verdana', serif; color: #000;">
                <div style="max-width: 600px; margin: 10px; background-color: #fafafa; padding: 25px; border-radius: 20px;">
                <p style="text-align: left;">{content}</p>
                <a href="{button_url}" target="_blank">
                    <button style="background-color: #27890F; border: 0; width: 200px; height: 30px; border-radius: 6px; color: #fff;">{button_text}</button>
                </a>
                <p style="text-align: left;">
                    If you are unable to click the above button, copy paste the below URL into your address bar
                </p>
                <a href="{button_url}" target="_blank">
                    <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">{button_url}</p>
                </a>
                </div>
            </body>
            </html>"""

def validate_password(password):
    pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*?&]{8,}$'
    return bool(re.match(pattern, password))

def check_password(plain_password, hashed_password):
    return django_check_password(plain_password, hashed_password)

class ResetPasswordView(APIView):
    def post(self, request, format=None):
        user_id = request.data.get("id")
        token = request.data.get("token")
        password = request.data.get("password")

        if not user_id or not token or not password:
            return Response(
                {"success": False, "message": "Missing required fields."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not validate_password(password):
            return Response(
                {"success": False, "message": "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            token_obj = Token.objects.filter(user_id=user_id).order_by("-created_at").first()
            if token_obj is None:
                raise Token.DoesNotExist
        except Token.DoesNotExist:
            return Response(
                {"success": False, "message": "Invalid Token."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if token_obj.expires_at < timezone.now() or token != token_obj.token or token_obj.is_used:
            return Response(
                {"success": False, "message": "Invalid or expired password reset link."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        token_obj.is_used = True
        token_obj.save()

        user = User.objects.get(id=user_id)
        user.password = make_password(password, salt=SALT)
        user.save()

        return Response(
            {"success": True, "message": "Password reset successfully."},
            status=status.HTTP_200_OK,
        )

class ChangePasswordView(APIView):
    def post(self, request, format=None):
        email = request.data.get("email")
        old_password = request.data.get("oldpassword")
        new_password = request.data.get("password")

        if not email or not old_password or not new_password:
            return Response(
                {"success": False, "message": "Missing required fields."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not validate_password(new_password):
            return Response(
                {"success": False, "message": "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "Email not registered."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not check_password(old_password, user.password):
            return Response(
                {"success": False, "message": "Old password is incorrect."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if check_password(new_password, user.password):
            return Response(
                {"success": False, "message": "New password cannot be the same as the old password."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.password = make_password(new_password, salt=SALT)
        user.lastUpdated = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        user.save()

        return Response(
            {"success": True, "message": "Password changed successfully."},
            status=status.HTTP_200_OK,
        )

class ForgotPasswordView(APIView):
    def post(self, request, format=None):
        email = request.data.get("email")
        
        if not email:
            return Response(
                {"success": False, "message": "Missing email field."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "Email not registered."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        created_at = timezone.now()
        expires_at = created_at + timedelta(days=1)
        salt = uuid.uuid4().hex
        token = hashlib.sha512(
            (str(user.id) + user.password + created_at.isoformat() + salt).encode("utf-8")
        ).hexdigest()

        token_obj = Token(
            token=token,
            created_at=created_at,
            expires_at=expires_at,
            user_id=user.id
        )
        token_obj.save()

        subject = "Whatbyte Forgot Password"
        content = mail_template(
            "We have received a request to reset your password. Please reset your password using the link below.",
            f"{URL}/resetPassword?id={user.id}&token={token}",
            "Reset Password",
        )
        send_mail(
            subject=subject,
            message='',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            html_message=content,
        )

        return Response(
            {"success": True, "message": "A password reset link has been sent to your email."},
            status=status.HTTP_200_OK,
        )

class RegistrationView(APIView):
    def post(self, request, format=None):
        password = request.data.get("password")
        if not validate_password(password):
            return Response(
                {"success": False, "message": "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        request.data["password"] = make_password(password=password, salt=SALT)
        request.data["lastUpdated"] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": True, "message": "Registration successful."},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {"success": False, "message": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

class LoginView(APIView):
    def post(self, request, format=None):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"success": False, "message": "Missing email or password."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "Email not registered."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not check_password(password, user.password):
            return Response(
                {"success": False, "message": "Invalid password."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"success": True, "message": "Login successful.", "name": user.name, "joined": user.JoinedOn, "lastUpdated": user.lastUpdated},
            status=status.HTTP_200_OK,
        )
