const express = require( 'express' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".
 */
const payrouter = express.Router(); 

const mongoose = require( 'mongoose' );
const { User} = require( './models/user.model' );

const Insta = require('instamojo-nodejs');
const url = require('url');
 

// /api/bid/pay
payrouter.post( '/pay', ( req, res ) => {
	Insta.setKeys('test_bc3a3e3bbec5cd272621847a9df', 'test_fc75f2e2407aaa157ba0ed42e78');
    
	const data = new Insta.PaymentData();
	Insta.isSandboxMode(true);
	//648c39c3bd175f8e4c6f4f1e
	data.purpose =  req.body.purpose;
	data.amount = req.body.amount;
	data.buyer_name =  "rajan rai";
	data.redirect_url =  "http://localhost:4100/instamojo/callback";
	data.email =  "youthchoice2@gmail.com";
	data.phone =  "6387501748";
	data.send_email =  false;
	data.webhook= '';
	data.send_sms= false;
	data.allow_repeated_payments =  false;
     console.log("console data",data);
	Insta.createPayment(data, function(error, response) {
		if (error) {
			// some error
		} else {
			// Payment redirection link at response.payment_request.longurl
			const responseData = JSON.parse( response );
			console.log("response come from mojo ", response);
			const url = responseData.payment_request.longurl;
			console.log("redirect url is ", url);
			// console.log(" rediect url show" ,redirectUrl );
          res.send({link: url});
			
		  
		}
	});  

} );

/**
 * @route GET api/bid/callback/
 * @desc Call back url for instamojo
 * @access public
 */
payrouter.get( '/callback/', ( req, res ) => {
	let url_parts = url.parse( req.url, true),
		responseData = url_parts.query;
        console.log("data come from instamojo ..payment history" , responseData);
	if ( responseData.payment_id ) {
	//	let userId = responseData.user_id;

		// Save the info that user has purchased the bid.
		// const bidData = {};
		// bidData.package = 'Bid100';
		// bidData.bidCountInPack = '10';

		// User.findOneAndUpdate( { _id: userId }, { $set: bidData }, { new: true } )
		// 	.then( ( user ) => res.json( user ) )
		// 	.catch( ( errors ) => res.json( errors ) );

		// Redirect the user to payment complete page.
		return res.render('mojosuccess');
	}

} );

// We export the router so that the server.js file can pick it up





payrouter.get('/', (req,res)=>{
   res.render('instamojo',{ title: "payement form"});
});

module.exports = { payrouter };