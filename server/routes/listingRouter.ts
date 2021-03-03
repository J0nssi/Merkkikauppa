import { Router } from 'express';
import Listing from '../models/listingModel';

const listingRouter = Router();

listingRouter.route('/').get((req, res) => {
    Listing.find().populate('seller').exec((err, listings) =>{
        if (err) {
            console.log(err);
        } else {
            res.json(listings);
        }
    })
})

export default listingRouter