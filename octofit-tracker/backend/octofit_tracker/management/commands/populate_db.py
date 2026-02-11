from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Deleting existing data...')
        
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        self.stdout.write(self.style.SUCCESS('Existing data deleted'))
        
        # Create teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            total_points=0,
            member_count=0
        )
        team_dc = Team.objects.create(
            name='Team DC',
            total_points=0,
            member_count=0
        )
        self.stdout.write(self.style.SUCCESS(f'Created teams: {team_marvel.name}, {team_dc.name}'))
        
        # Create users (superheroes)
        self.stdout.write('Creating users...')
        marvel_heroes = [
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com'},
            {'name': 'Iron Man', 'email': 'ironman@marvel.com'},
            {'name': 'Captain America', 'email': 'captainamerica@marvel.com'},
            {'name': 'Thor', 'email': 'thor@marvel.com'},
            {'name': 'Black Widow', 'email': 'blackwidow@marvel.com'},
            {'name': 'Hulk', 'email': 'hulk@marvel.com'},
        ]
        
        dc_heroes = [
            {'name': 'Superman', 'email': 'superman@dc.com'},
            {'name': 'Batman', 'email': 'batman@dc.com'},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com'},
            {'name': 'The Flash', 'email': 'flash@dc.com'},
            {'name': 'Aquaman', 'email': 'aquaman@dc.com'},
            {'name': 'Green Lantern', 'email': 'greenlantern@dc.com'},
        ]
        
        marvel_users = []
        for hero in marvel_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team_id=str(team_marvel._id),
                total_points=0
            )
            marvel_users.append(user)
        
        dc_users = []
        for hero in dc_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team_id=str(team_dc._id),
                total_points=0
            )
            dc_users.append(user)
        
        all_users = marvel_users + dc_users
        self.stdout.write(self.style.SUCCESS(f'Created {len(all_users)} users'))
        
        # Update team member counts
        team_marvel.member_count = len(marvel_users)
        team_marvel.save()
        team_dc.member_count = len(dc_users)
        team_dc.save()
        
        # Create workouts
        self.stdout.write('Creating workouts...')
        workouts_data = [
            {
                'name': 'Super Strength Training',
                'description': 'Build incredible strength like the Hulk',
                'category': 'Strength',
                'difficulty': 'Advanced',
                'estimated_duration': 45,
                'points_per_session': 50
            },
            {
                'name': 'Speed Run Challenge',
                'description': 'Run fast like The Flash',
                'category': 'Cardio',
                'difficulty': 'Intermediate',
                'estimated_duration': 30,
                'points_per_session': 35
            },
            {
                'name': 'Web Slinger Yoga',
                'description': 'Flexibility training inspired by Spider-Man',
                'category': 'Flexibility',
                'difficulty': 'Beginner',
                'estimated_duration': 25,
                'points_per_session': 25
            },
            {
                'name': 'Warrior Combat Training',
                'description': 'Mixed martial arts like Wonder Woman',
                'category': 'Combat',
                'difficulty': 'Advanced',
                'estimated_duration': 60,
                'points_per_session': 60
            },
            {
                'name': 'Flight Simulation HIIT',
                'description': 'High intensity interval training like Iron Man',
                'category': 'HIIT',
                'difficulty': 'Advanced',
                'estimated_duration': 40,
                'points_per_session': 45
            },
            {
                'name': 'Aquatic Endurance',
                'description': 'Swimming workout inspired by Aquaman',
                'category': 'Swimming',
                'difficulty': 'Intermediate',
                'estimated_duration': 50,
                'points_per_session': 40
            },
            {
                'name': 'Shield Defense Drills',
                'description': 'Core and defense training like Captain America',
                'category': 'Core',
                'difficulty': 'Intermediate',
                'estimated_duration': 35,
                'points_per_session': 30
            },
            {
                'name': 'Dark Knight Calisthenics',
                'description': 'Bodyweight exercises from Batman\'s routine',
                'category': 'Calisthenics',
                'difficulty': 'Advanced',
                'estimated_duration': 55,
                'points_per_session': 55
            },
        ]
        
        workouts = []
        for workout_data in workouts_data:
            workout = Workout.objects.create(**workout_data)
            workouts.append(workout)
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts)} workouts'))
        
        # Create activities for users
        self.stdout.write('Creating activities...')
        activity_types = ['Running', 'Weightlifting', 'Yoga', 'Swimming', 'Cycling', 'HIIT', 'Boxing', 'Pilates']
        activities_created = 0
        
        for user in all_users:
            # Create 5-10 random activities per user
            num_activities = random.randint(5, 10)
            user_total_points = 0
            
            for i in range(num_activities):
                activity_type = random.choice(activity_types)
                duration = random.randint(20, 90)
                points = duration // 2  # Points based on duration
                
                # Create activity with a date in the past 30 days
                days_ago = random.randint(0, 30)
                activity_date = datetime.now() - timedelta(days=days_ago)
                
                activity = Activity.objects.create(
                    user_id=str(user._id),
                    activity_type=activity_type,
                    duration=duration,
                    points=points,
                    date=activity_date
                )
                user_total_points += points
                activities_created += 1
            
            # Update user total points
            user.total_points = user_total_points
            user.save()
        
        self.stdout.write(self.style.SUCCESS(f'Created {activities_created} activities'))
        
        # Update team points
        self.stdout.write('Updating team totals...')
        team_marvel.total_points = sum(user.total_points for user in marvel_users)
        team_marvel.save()
        
        team_dc.total_points = sum(user.total_points for user in dc_users)
        team_dc.save()
        
        # Create leaderboard entries
        self.stdout.write('Creating leaderboard...')
        
        # Sort users by points
        sorted_users = sorted(all_users, key=lambda x: x.total_points, reverse=True)
        for rank, user in enumerate(sorted_users, start=1):
            Leaderboard.objects.create(
                entity_type='user',
                entity_id=str(user._id),
                entity_name=user.name,
                total_points=user.total_points,
                rank=rank
            )
        
        # Create team leaderboard entries
        teams = [team_marvel, team_dc]
        sorted_teams = sorted(teams, key=lambda x: x.total_points, reverse=True)
        for rank, team in enumerate(sorted_teams, start=1):
            Leaderboard.objects.create(
                entity_type='team',
                entity_id=str(team._id),
                entity_name=team.name,
                total_points=team.total_points,
                rank=rank
            )
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(sorted_users) + len(sorted_teams)} leaderboard entries'))
        
        # Summary
        self.stdout.write(self.style.SUCCESS('\n=== Database Population Complete ==='))
        self.stdout.write(f'Teams: {Team.objects.count()}')
        self.stdout.write(f'Users: {User.objects.count()}')
        self.stdout.write(f'Activities: {Activity.objects.count()}')
        self.stdout.write(f'Workouts: {Workout.objects.count()}')
        self.stdout.write(f'Leaderboard entries: {Leaderboard.objects.count()}')
        self.stdout.write(self.style.SUCCESS('===================================\n'))
