from django.contrib import admin
from .models import Donation
from .models import Campaign

# Register your models here.
@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display1 = ['title', 'description', 'goal', 'amount_raised', 'image']

@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display2 = ['campaign', 'amount', 'donor_name', 'donor_email', 'created_at']
