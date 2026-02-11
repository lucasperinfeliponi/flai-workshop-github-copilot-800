from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            name="Test User",
            email="test@example.com",
            total_points=100
        )
    
    def test_user_creation(self):
        self.assertEqual(self.user.name, "Test User")
        self.assertEqual(self.user.email, "test@example.com")
        self.assertEqual(self.user.total_points, 100)
    
    def test_user_str(self):
        self.assertEqual(str(self.user), "Test User")


class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name="Test Team",
            total_points=500,
            member_count=5
        )
    
    def test_team_creation(self):
        self.assertEqual(self.team.name, "Test Team")
        self.assertEqual(self.team.total_points, 500)
        self.assertEqual(self.team.member_count, 5)
    
    def test_team_str(self):
        self.assertEqual(str(self.team), "Test Team")


class ActivityModelTest(TestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            user_id="507f1f77bcf86cd799439011",
            activity_type="Running",
            duration=30,
            points=50
        )
    
    def test_activity_creation(self):
        self.assertEqual(self.activity.activity_type, "Running")
        self.assertEqual(self.activity.duration, 30)
        self.assertEqual(self.activity.points, 50)
    
    def test_activity_str(self):
        self.assertEqual(str(self.activity), "Running - 50 points")


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.leaderboard = Leaderboard.objects.create(
            entity_type="user",
            entity_id="507f1f77bcf86cd799439011",
            entity_name="Test User",
            total_points=200,
            rank=1
        )
    
    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard.entity_type, "user")
        self.assertEqual(self.leaderboard.entity_name, "Test User")
        self.assertEqual(self.leaderboard.rank, 1)
    
    def test_leaderboard_str(self):
        self.assertEqual(str(self.leaderboard), "Test User - Rank 1")


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name="Morning Run",
            description="A refreshing morning run",
            category="Cardio",
            difficulty="Easy",
            estimated_duration=30,
            points_per_session=25
        )
    
    def test_workout_creation(self):
        self.assertEqual(self.workout.name, "Morning Run")
        self.assertEqual(self.workout.category, "Cardio")
        self.assertEqual(self.workout.difficulty, "Easy")
        self.assertEqual(self.workout.points_per_session, 25)
    
    def test_workout_str(self):
        self.assertEqual(str(self.workout), "Morning Run")
