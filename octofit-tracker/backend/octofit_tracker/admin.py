from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'team_id', 'total_points']
    search_fields = ['name', 'email']
    list_filter = ['total_points']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'total_points', 'member_count']
    search_fields = ['name']
    list_filter = ['total_points', 'member_count']


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['activity_type', 'user_id', 'duration', 'points', 'date']
    search_fields = ['user_id', 'activity_type']
    list_filter = ['activity_type', 'date']
    date_hierarchy = 'date'


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ['entity_name', 'entity_type', 'rank', 'total_points']
    search_fields = ['entity_name']
    list_filter = ['entity_type', 'rank']


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'difficulty', 'estimated_duration', 'points_per_session']
    search_fields = ['name', 'category']
    list_filter = ['category', 'difficulty']
