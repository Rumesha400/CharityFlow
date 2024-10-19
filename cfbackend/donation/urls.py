from django.urls import path
from donation import views
from .views import donate, send_email
from django.conf import settings
from django.conf.urls.static import static

urlpatterns =[
    path('donation/', views.DonationList.as_view()),
    path('campaign/', views.CampaignList.as_view(), name='Campaign-List'),   
    path('donate/', donate, name='donate'),
    
]
# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)