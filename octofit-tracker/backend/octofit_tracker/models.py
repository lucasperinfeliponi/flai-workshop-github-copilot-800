from djongo import models


class User(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team_id = models.CharField(max_length=24, null=True, blank=True)
    total_points = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'users'
        
    def __str__(self):
        return self.name


class Team(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    total_points = models.IntegerField(default=0)
    member_count = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'teams'
        
    def __str__(self):
        return self.name


class Activity(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    user_id = models.CharField(max_length=24)
    activity_type = models.CharField(max_length=50)
    duration = models.IntegerField()  # in minutes
    points = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'activities'
        
    def __str__(self):
        return f"{self.activity_type} - {self.points} points"


class Leaderboard(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    entity_type = models.CharField(max_length=10)  # 'user' or 'team'
    entity_id = models.CharField(max_length=24)
    entity_name = models.CharField(max_length=100)
    total_points = models.IntegerField(default=0)
    rank = models.IntegerField(default=0)
    
    class Meta:
        db_table = 'leaderboard'
        
    def __str__(self):
        return f"{self.entity_name} - Rank {self.rank}"


class Workout(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=50)
    difficulty = models.CharField(max_length=20)
    estimated_duration = models.IntegerField()  # in minutes
    points_per_session = models.IntegerField()
    
    class Meta:
        db_table = 'workouts'
        
    def __str__(self):
        return self.name
