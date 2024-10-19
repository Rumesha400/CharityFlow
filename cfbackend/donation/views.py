from .models import Campaign, Donation, DonationMethod
from .serializers import CampaignSerializer, DonationSerializer, DonationMethodSerializer
from rest_framework.generics import ListCreateAPIView, ListAPIView


from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class CampaignList(ListCreateAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer    

class DonationList(ListCreateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer  

    
    def perform_create(self, serializer):
        donation = serializer.save()
        campaign = donation.campaign
        campaign.update_amount_raised()  # Update the amount raised
        

class DonationMethodList(ListAPIView):
    queryset = DonationMethod.objects.all()  # Get all donation methods
    serializer_class = DonationMethodSerializer




@api_view(['POST'])
def donate(request):
    serializer = DonationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import json
from smtplib import SMTPAuthenticationError
import logging

logger = logging.getLogger(__name__)

@csrf_exempt  # For development only. In production, use proper CSRF protection.
def send_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            name = data.get('name')
            email = data.get('email')
            message = data.get('message')

            # Ensure that required fields are present
            if not all([name, email, message]):
                return JsonResponse({'status': 'error', 'message': 'Missing required fields'}, status=400)

            # Validate email
            try:
                validate_email(email)
            except ValidationError:
                return JsonResponse({'status': 'error', 'message': 'Invalid email address'}, status=400)

            # Prepare email content
            subject = f"Message from {name}"
            body = f"Name: {name}\nEmail: {email}\nMessage:{message}"

            try:
                # Send email
                send_mail(
                    subject,
                    body,
                    'rachoss5869@gmail.com',  # Your sender email
                    [email],  # User's email as the recipient
                    fail_silently=False,
                )
                return JsonResponse({'status': 'success', 'message': 'Email sent successfully'}, status=200)
            except SMTPAuthenticationError as e:
                logger.error(f"SMTP Authentication Error: {str(e)}")
                return JsonResponse({'status': 'error', 'message': 'Failed to authenticate with the email server. Please contact support.'}, status=500)
            except Exception as e:
                logger.error(f"Error sending email: {str(e)}", exc_info=True)
                return JsonResponse({'status': 'error', 'message': 'An error occurred while sending the email'}, status=500)

        except json.JSONDecodeError:
            logger.error("Invalid JSON in request body", exc_info=True)
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
        except Exception as e:
            logger.error(f"Unexpected error in send_email: {str(e)}", exc_info=True)
            return JsonResponse({'status': 'error', 'message': 'An unexpected error occurred while processing your request'}, status=500)

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)