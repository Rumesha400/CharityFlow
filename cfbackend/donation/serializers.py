from rest_framework import serializers
from .models import Campaign, Donation

class CampaignSerializer(serializers.ModelSerializer):
    total_donations = serializers.SerializerMethodField()   # Add this line

    class Meta:
        model = Campaign
        fields = '__all__'

    def get_total_donations(self, obj):
        return obj.campaign_donations.count()    

class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'

from .models import DonationMethod

class DonationMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonationMethod
        fields = ['id', 'name', 'logo', 'payment_url']  # Fields to expose via API

        