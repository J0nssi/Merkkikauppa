import { Router } from 'express';
import listingModel from '../models/listingModel';

const listingRouter = Router();

listingRouter.route('/').get((req, res) => {
    listingModel.find((err, listings) =>{
        if (err) {
            console.log(err);
        } else {
            res.json(listings);
        }
    })
})

export default listingRouter