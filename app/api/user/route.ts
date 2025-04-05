import User from "@/models/User";
import Profile from "@/models/Profile";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDB from "@/database/connectToDB";

// GET user by ID

// GET all users
export const getAllUsers = async () => {
  try {
    const users = await User.find().select("-password");
    return NextResponse.json(users, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
};

// Create user
export const POST = async (req: Request) => {
  try {
    console.log("Post request");
    await connectToDB();
    const data = await req.json();
    console.log(data);
    const { email, name, password } = data;
    // const { name, email, password } = await req.json();
    console.log(name, email, password);
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        {
          status: 400,
        }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create profile for user
    await Profile.create({
      user,
      name,
      email,
      streak: "0",
      level: "1",
      points: "0",
      badges: [],
      achievements: [],
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
};

// Update user

// User login
export const login = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        {
          status: 400,
        }
      );
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        {
          status: 400,
        }
      );
    }

    // Update streak on login
    await updateDailyStreak(user.email);

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
};

// Function to update daily streak
export const updateDailyStreak = async (email: string) => {
  try {
    const profile = await Profile.findOne({ email });
    if (!profile) {
      return false;
    }

    const lastLogin = profile.updatedAt;
    const now = new Date();

    // Calculate days difference
    const daysDiff = Math.floor(
      (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
    );

    let currentStreak = parseInt(profile.streak);

    // If logged in same day, don't update streak
    if (daysDiff === 0) {
      return true;
    }

    // If logged in the next day, increment streak
    if (daysDiff === 1) {
      currentStreak += 1;
    } else {
      // If missed a day, reset streak
      currentStreak = 1;
    }

    // Update streak
    profile.streak = currentStreak.toString();

    // Check if achieved a new streak milestone
    checkStreakAchievements(profile);

    await profile.save();
    return true;
  } catch (error) {
    console.error("Error updating streak:", error);
    return false;
  }
};

// Check streak achievements
const checkStreakAchievements = (profile: any) => {
  const streak = parseInt(profile.streak);
  const achievements = profile.achievements;

  if (streak >= 7 && !achievements.includes("7-Day Streak")) {
    achievements.push("7-Day Streak");
  }

  if (streak >= 30 && !achievements.includes("30-Day Streak")) {
    achievements.push("30-Day Streak");
  }

  if (streak >= 100 && !achievements.includes("100-Day Streak")) {
    achievements.push("100-Day Streak");
  }
};
