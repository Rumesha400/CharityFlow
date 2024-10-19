# Generated by Django 5.1.1 on 2024-09-27 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donation', '0014_alter_donation_campaign'),
    ]

    operations = [
        migrations.AddField(
            model_name='donation',
            name='is_anonymous',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='donation',
            name='is_subscribed',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='donation',
            name='tip',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=5),
        ),
    ]
