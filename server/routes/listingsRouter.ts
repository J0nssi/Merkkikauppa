import { Router } from 'express';
import passport from 'passport';
import User, { IUser } from '../models/userModel';
import { CallbackError} from 'mongoose';
import Listing, { IListing } from '../models/listingModel';

const listingsRouter = Router();

listingsRouter.route('/').get((req, res) => {
    Listing.find().populate('seller').exec((err, listings) =>{
        if (err) {
            console.log(err);
        } else {
            res.json(listings);
        }
    })
})

listingsRouter.route('/u/:userId').get((req, res) => {
    Listing.find({seller: req.params.userId as any}).populate('seller').exec((err, listings) =>{
        if (err) {
            console.log(err);
        } else {
            res.json(listings);
        }
    })
});

listingsRouter.route('/myListings').get((req, res) => {
    passport.authenticate("jwt", { session: false }, (err: CallbackError, userMatch: IUser | null, message: object) => {
        if (userMatch) {
            userMatch.populate('listings')
            let userListings = userMatch.listings;
            return res.status(200).json(userListings);
        } else {
            return res.status(401).json(message);
        }
    })(req, res);
})

listingsRouter.route('/s/:search').get((req, res) => {
    const search = new RegExp(req.params.search, 'i');
    Listing.find({
        $or:[ 
            {title: search}, 
            {description:search}
        ]}).populate('seller').exec((err, listingMatches) =>{
        if (err) {
            console.log(err);
        } else {
            User.find({name: search}).populate('listings').exec((err, userMatches) => {
                if (err) {
                    console.log(err);
                } else {
                    let userListingMatches = [] as IListing[];
                    userMatches.forEach(user => user.listings.forEach(listing => userListingMatches.push(listing)))
                    let allMatches = [...new Set([...listingMatches, ...userListingMatches])];
                    res.json(allMatches);
                }
            })
        }
    })
    
})

export default listingsRouter