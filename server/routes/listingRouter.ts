import { Router } from 'express';
import { IUser } from '../models/userModel';
import passport from 'passport';
import Listing, { IListing } from '../models/listingModel';
import { CallbackError } from 'mongoose';

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

listingRouter.route('/add').post((req,res) => {
    console.log("ADD LISTING REQUEST");
    passport.authenticate('jwt', { session: false }, 
    (err: CallbackError, userMatch: IUser | null, message: object) => {
        if (err) {
            console.log("Error authenticating user")
            res.status(401).json({message: "Error authenticating user"});
        } else if(!userMatch) {
            res.status(401).json(message);
        }
        else if (!req.body.title) {
            res.status(401).json({ message: "Invalid payload"});   
        }  
        else {
            const { title, description, price, item_count, urls }: IListing = req.body;

            const newListing = new Listing({
                'title': title,
                'description': description,
                'seller': userMatch._id,
                'price': price,
                'item_count': item_count,
                'urls': urls,
                'date_created': Date.now()
            });

            console.log("newListing: " + newListing);
            newListing.save((err, savedListing) => {
                console.log("err: " + err);
                console.log("savedListing: " + savedListing);
                if(err)
                    return res.status(401).json(err);
                return res.json(savedListing);
            });
        }
    })(req, res);
})

export default listingRouter;