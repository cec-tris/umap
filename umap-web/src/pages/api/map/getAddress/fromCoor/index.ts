import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
const nearestAddress = require("../../../utils/nearestAddressFromCoor");

// custom req
interface CustomNextApiRequest extends NextApiRequest {
    query: {
        lng: string;
        lat: string;
    };
}

export default async function handler(req: CustomNextApiRequest, res: NextApiResponse) {
    res.on('close', () => {
        prisma.$disconnect()
        return res.end()
    })
    // only get request
    if (req.method === 'GET') {
        // get lng and lat from req.query
        const lng: string = req.query.lng
        const lat: string = req.query.lat
        if (!lng || !lat) {
            res.status(400).json({
                state: "failed",
                message: "lng and lat must be provided"
            })
            return
        }
        const result = await nearestAddress(prisma, lng, lat)
        await prisma.$disconnect()
        if (res.closed)
            return
        res.status(200).json({
            state: "success",
            message: "Your request is accepted",
            data: result
        })
        return
    }
    else {
        res.status(400).json({
            state: "failed",
            message: "Your request is rejected"
        })
        return
    }


}