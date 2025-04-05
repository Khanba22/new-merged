import User from "@/models/User";
import Profile from "@/models/Profile";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const id = req.url.split("/").pop();
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, {
        status: 404,
      });
    }
    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, {
      status: 500,
    });
  }
};

export const PUT = async (req: Request) => {
  const id = req.url.split("/").pop();
  try {
    const { name, email } = await req.json();
    
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, {
        status: 404,
      });
    }
    
    // Update user
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    
    // Update profile email if email is changed
    if (email && email !== user.email) {
      const profile = await Profile.findOne({ email: user.email });
      if (profile) {
        profile.email = email;
        profile.name = name || profile.name;
        await profile.save();
      }
    }
    
    return NextResponse.json({ 
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, {
      status: 500,
    });
  }
};

// Delete user
export const DELETE = async (req: Request) => {
  const id = req.url.split("/").pop();
  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, {
        status: 404,
      });
    }
    
    // Delete user profile first
    await Profile.findOneAndDelete({ email: user.email });
    
    // Delete user
    await User.findByIdAndDelete(id);
    
    return NextResponse.json({ 
      message: "User deleted successfully"
    }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, {
      status: 500,
    });
  }
};
