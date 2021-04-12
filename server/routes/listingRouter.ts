import { Router } from 'express';
import Listing from '../models/listingModel';

const listingRouter = Router();

listingRouter.route('/').get((req, res) => {
    return res.status(401).json({
        message: "Listing ID not provided."
    })
});

listingRouter.route('/:listingID').get((req, res) => {
    Listing.findById(req.params.listingID).then(listing => {
        return res.status(200).json(listing);
    }).catch(() => {
        return res.status(401).json({message: "Listing not found."})
    });
});

export default listingRouter;