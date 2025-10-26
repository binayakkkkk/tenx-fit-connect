import { Dumbbell, Footprints, User } from "lucide-react";
import workoutHero from "@/assets/workout-hero.jpg";
import runningHero from "@/assets/running-hero.jpg";
import personalTrainingHero from "@/assets/personal-training-hero.jpg";

export interface Program {
  id: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  icon: typeof Dumbbell;
  overview: string;
  benefits: string[];
  features: string[];
  schedule: {
    day: string;
    activities: string[];
  }[];
  pricing: {
    tier: string;
    price: string;
    period: string;
    features: string[];
    popular?: boolean;
  }[];
  instructorInfo: {
    name: string;
    role: string;
    bio: string;
  }[];
}

export const programs: Program[] = [
  {
    id: "workout-mobility",
    slug: "workout-mobility",
    title: "Workout & Mobility",
    description: "Build strength and flexibility with our comprehensive training programs designed for all fitness levels.",
    heroImage: workoutHero,
    icon: Dumbbell,
    overview: "Our Workout & Mobility program combines strength training with flexibility work to create a balanced, functional fitness routine. Whether you're a beginner or advanced athlete, our expert coaches will help you build sustainable strength and improve your range of motion.",
    benefits: [
      "Increase overall strength and muscle definition",
      "Improve flexibility and range of motion",
      "Reduce risk of injury through proper form",
      "Enhance athletic performance across all activities",
      "Build a sustainable, lifelong fitness practice",
    ],
    features: [
      "Strength Training",
      "Flexibility Work",
      "Recovery Sessions",
      "Expert Coaching",
      "Progress Tracking",
      "Small Group Classes",
    ],
    schedule: [
      {
        day: "Monday & Thursday",
        activities: ["Upper Body Strength", "Mobility Flow", "Core Work"],
      },
      {
        day: "Tuesday & Friday",
        activities: ["Lower Body Strength", "Flexibility Training", "Recovery Stretch"],
      },
      {
        day: "Wednesday",
        activities: ["Full Body Circuit", "Dynamic Mobility", "Cool Down"],
      },
      {
        day: "Saturday",
        activities: ["Open Gym", "Mobility Workshop", "Community Session"],
      },
    ],
    pricing: [
      {
        tier: "Basic",
        price: "$99",
        period: "per month",
        features: [
          "3 classes per week",
          "Access to open gym hours",
          "Mobile app access",
          "Progress tracking",
        ],
      },
      {
        tier: "Premium",
        price: "$149",
        period: "per month",
        features: [
          "Unlimited classes",
          "24/7 gym access",
          "Personalized program",
          "Nutrition guidance",
          "Monthly progress reviews",
        ],
        popular: true,
      },
      {
        tier: "Elite",
        price: "$249",
        period: "per month",
        features: [
          "Everything in Premium",
          "2 personal training sessions/month",
          "Priority class booking",
          "Guest passes (4/month)",
          "Exclusive workshops",
        ],
      },
    ],
    instructorInfo: [
      {
        name: "Sarah Chen",
        role: "Head Strength Coach",
        bio: "15+ years of experience in strength training and mobility work. Former Olympic weightlifting competitor.",
      },
      {
        name: "Marcus Williams",
        role: "Mobility Specialist",
        bio: "Certified yoga instructor and mobility coach. Specializes in functional movement patterns.",
      },
    ],
  },
  {
    id: "running",
    slug: "running",
    title: "Running Programs",
    description: "From beginners to marathoners, improve your running performance with structured training plans.",
    heroImage: runningHero,
    icon: Footprints,
    overview: "Our Running Programs cater to all levels, from complete beginners taking their first steps to experienced runners training for marathons. With structured training plans, form analysis, and a supportive community, you'll achieve your running goals faster and safer.",
    benefits: [
      "Build endurance and cardiovascular fitness",
      "Improve running form and efficiency",
      "Train safely with progressive loading",
      "Connect with a supportive running community",
      "Achieve race goals from 5K to marathon",
    ],
    features: [
      "5K to Marathon Prep",
      "Speed Work",
      "Endurance Building",
      "Running Form Analysis",
      "Weekly Group Runs",
      "Race Strategy Coaching",
    ],
    schedule: [
      {
        day: "Monday",
        activities: ["Easy Recovery Run", "Stretching Session"],
      },
      {
        day: "Tuesday",
        activities: ["Speed Work", "Interval Training", "Cool Down"],
      },
      {
        day: "Wednesday",
        activities: ["Tempo Run", "Form Drills"],
      },
      {
        day: "Thursday",
        activities: ["Easy Run", "Strength Training for Runners"],
      },
      {
        day: "Saturday",
        activities: ["Long Run", "Group Run", "Post-Run Recovery"],
      },
      {
        day: "Sunday",
        activities: ["Optional Easy Run", "Active Recovery", "Yoga for Runners"],
      },
    ],
    pricing: [
      {
        tier: "Starter",
        price: "$79",
        period: "per month",
        features: [
          "Training plan access",
          "Weekly group runs",
          "Mobile app with GPS tracking",
          "Community forum access",
        ],
      },
      {
        tier: "Racer",
        price: "$129",
        period: "per month",
        features: [
          "Personalized training plan",
          "Unlimited group runs",
          "Running form analysis (monthly)",
          "Race strategy sessions",
          "Virtual coaching check-ins",
        ],
        popular: true,
      },
      {
        tier: "Elite Runner",
        price: "$199",
        period: "per month",
        features: [
          "Everything in Racer",
          "Weekly 1-on-1 coaching calls",
          "Biomechanical assessment",
          "Race day support",
          "Priority event registration",
        ],
      },
    ],
    instructorInfo: [
      {
        name: "David Torres",
        role: "Head Running Coach",
        bio: "Boston Marathon qualifier and USATF certified coach. 10+ years coaching runners of all levels.",
      },
      {
        name: "Emily Rodriguez",
        role: "Endurance Specialist",
        bio: "Ultra-marathon runner and certified running coach. Specializes in long-distance training.",
      },
    ],
  },
  {
    id: "personal-training",
    slug: "personal-training",
    title: "Personal Training",
    description: "Get one-on-one attention with customized workout plans tailored to your specific goals.",
    heroImage: personalTrainingHero,
    icon: User,
    overview: "Our Personal Training program provides you with dedicated one-on-one coaching tailored to your unique goals, fitness level, and lifestyle. Work directly with certified trainers who will design custom programs, provide accountability, and help you achieve results faster.",
    benefits: [
      "100% customized training programs",
      "Dedicated coach accountability",
      "Faster results with targeted programming",
      "Learn proper form and technique",
      "Flexible scheduling around your life",
    ],
    features: [
      "Custom Programs",
      "1-on-1 Coaching",
      "Progress Tracking",
      "Nutrition Guidance",
      "Flexible Scheduling",
      "Goal Setting & Reviews",
    ],
    schedule: [
      {
        day: "Flexible",
        activities: ["Schedule based on your availability and goals", "Minimum 2x per week recommended"],
      },
    ],
    pricing: [
      {
        tier: "Foundation",
        price: "$199",
        period: "per month",
        features: [
          "4 personal training sessions",
          "Custom workout program",
          "Progress tracking",
          "Text/email support",
        ],
      },
      {
        tier: "Transform",
        price: "$349",
        period: "per month",
        features: [
          "8 personal training sessions",
          "Custom workout + nutrition plan",
          "Weekly progress reviews",
          "Priority scheduling",
          "Unlimited text/email support",
        ],
        popular: true,
      },
      {
        tier: "Elite Performance",
        price: "$599",
        period: "per month",
        features: [
          "12 personal training sessions",
          "Comprehensive program design",
          "Daily coach check-ins",
          "Body composition analysis",
          "Supplement recommendations",
          "24/7 coach access",
        ],
      },
    ],
    instructorInfo: [
      {
        name: "Jordan Smith",
        role: "Lead Personal Trainer",
        bio: "Certified Strength & Conditioning Specialist with expertise in body transformation and athletic performance.",
      },
      {
        name: "Alex Kim",
        role: "Senior Personal Trainer",
        bio: "10+ years experience in functional fitness, injury rehabilitation, and lifestyle coaching.",
      },
    ],
  },
];

export const getProgramBySlug = (slug: string): Program | undefined => {
  return programs.find((program) => program.slug === slug);
};
