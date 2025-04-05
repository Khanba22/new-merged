import User from "@/models/User"
import Profile from "@/models/Profile"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    const id = req.url.split("/").pop()
    try {
        const user = await User.findById(id).select("-password")
        if (!user) {
            return NextResponse.json({ error: "User not found" }, {
                status: 404,
            })
        }
        const profile = await Profile.findOne({ email: user.email })
        if (!profile) {
            return NextResponse.json({ error: "Profile not found" }, {
                status: 404,
            })
        }
        return NextResponse.json(profile, {
            status: 200,
        })
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, {
            status: 500,
        })
    }
}


export const POST = async (req: Request) => {
    const id = req.url.split("/").pop()
    try {
        const user = await User.findById(id).select("-password")
        if (!user) {
            return NextResponse.json({ error: "User not found" }, {
                status: 404,
            })
        }
        const profile = await Profile.findOne({ email: user.email })
        if (!profile) {
            return NextResponse.json({ error: "Profile not found" }, {
                status: 404,
            })
        }
        return NextResponse.json(profile, {
            status: 200,
        })
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, {
            status: 500,
        })
    }
}