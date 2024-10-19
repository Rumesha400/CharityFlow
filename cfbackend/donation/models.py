from django.db import models


class Campaign(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    goal = models.DecimalField(max_digits=10, decimal_places=2)
    amount_raised = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    image = models.ImageField(upload_to='campaign_images/')

    def update_amount_raised(self):
        print(f"Calling update_amount_raised for Campaign: {self.title}")
        total = self.campaign_donations.aggregate(total=models.Sum('amount'))['total'] or 0
        print(f"Calculated total donation: {total}")
        self.amount_raised = total
        self.save()
        print(f"Updated amount raised for Campaign: {self.amount_raised}")


class Donation(models.Model):
    campaign = models.ForeignKey(Campaign, related_name='campaign_donations', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donor_name = models.CharField(max_length=100, blank=True)
    donor_email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    tip = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    is_anonymous = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Save the donation first
        self.campaign.refresh_from_db()  # Refresh the campaign instance from the database
        self.campaign.update_amount_raised()  # Update the related campaign's amount_raised


class DonationMethod(models.Model):
    name = models.CharField(max_length=100)  # Donation method name (e.g., PayPal, Credit Card)
    logo = models.ImageField(upload_to='logos/')  # Path to the logo image
    payment_url = models.URLField(max_length=200)  # The URL for redirecting to the payment page

    def __str__(self):
        return self.name