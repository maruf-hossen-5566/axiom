from django.urls import path

from .views import *

urlpatterns = [
    path("posts/", get_posts, name="get_posts"),
    path("bookmarks/", get_bookmarks, name="get_bookmarks"),
    path("followers/", get_followers, name="get_followers"),
    path("following/", get_following, name="get_following"),
    path("block-list/", get_block_list, name="get_blocked"),
    path("card-data/", get_card_data, name="get_card_data"),
    path("engagement-data/", get_engagement_data, name="get_engagement_data"),
    path("followers-data/", get_followers_data, name="get_followers_data"),
]
