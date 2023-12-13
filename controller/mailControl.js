var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
const loginModel = require("../model/mailModel");
var bcrypt = require("bcrypt");


const createData = async (req, res) => {
    const find = await loginModel.find({email: req.body.email});
    if(find.length == 0){
    // if(find){
        const {name,email,password} = req.body;
        const Password = await bcrypt.hash(password, 10);
        const data = await loginModel.create({ name, email, password:Password });
        const mail = req.body.email;
        data.password = undefined;

        res.status(200).json({
            status: 'success',
            // data 
            data
        })

        var transporter = nodemailer.createTransport({
            service :'gmail',
            auth:{
                user:'jkjk070070@gmail.com',
                pass:'dqkc hecg llel dmkl'
            }
        });

        var mailOptions = {
            from:'jkjk070070@gmail.com',
            to:mail,
            subject:'Registration Success',
            text:'Your Registration is Successfully!'
        };
        
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log('Email sent:'+ info.response);
            }
        });
    }else{
        res.status(200).json({
            status:"email is declair"
        })
    }
}

const signIn = async(req,res)=>{
    const find = await loginModel.findOne({email:req.body.email});
    var token = jwt.sign({email:req.body.email},'dataa',{
        expiresIn:'50m'
    });
    // const data = await loginModel.updateOne({email:req.body.email},{token:token})
    if(find){
        const mail = find.email;
        if(find.password === req.body.password){
            find.password = undefined;  
            res.status(200).json({
                status: true,
                messege:"login success",
                user:find,
                // update:data,
                token
            })
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'jkjk070070@gmail.com',
                    pass: 'gnxi xpxp nisa mntc' 
                }
            });
            

            var mailOptions = {  
                from: 'jkjk070070@gmail.com',
                to: mail,
                subject: 'Login Success',
                text: 'Your login was successful!'
            };
            
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent:' + info.response);
                }
            });
        } else if (req.body.password === ''){
            res.status(404).json({
                status: "Pls Enter your password",
            })
        }
        else{
            res.status(404).json({
                status: "your pass is not valid"
            })
        }
    }else if (req.body.email === ''){
        res.status(400).json({
            status:"pls enter your email"
        })
    }
    else {
        res.status(404).json({
            status:'your email is not found',
        })
    }
}

    const sendResetEmail = async (email,resetToken)=>{
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'jkjk070070@gmail.com',
                pass: 'yyaa hjtq mjll onur',
                },
            });
            const resetLink = `http://your-website.com/reset-passworddd?token=${resetToken}`;
        const mailOptions = {
    from: 'jkjk070070@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${resetLink}`,
    }
    try {
        await transporter.sendMail(mailOptions);
        console.log('Reset email sent successfully');
    } catch (error) {
        console.error('Error sending reset email:', error);
    }
};

const forgotpassword = async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await loginModel.findOne({ email });
        
        if (!user) {
        return res.status(404).json({ status: 'Email not found' });
        }
        
        const resetToken = jwt.sign({ email }, 'your-secret-key', { expiresIn: '1h' });
        user.resetToken = resetToken;
        await user.save();
        
        sendResetEmail(email, resetToken);
        
        return res.status(200).json({
            status: 'Reset email sent successfully',
            resetToken
        });
    } catch (error) {
        console.error('Error sending reset email:', error);
        return res.status(500).json({ status: ' server error' });
        }
    };

    const resetpassword = async (req, res) => {
        const { email, token, newPassword } = req.body;       
        try {
            const user = await loginModel.findOne({ email });
            
            if (!user) {
            return res.status(404).json({ status: 'Email not found' });
            }
            if (user.resetToken !== token) {
            return res.status(401).json({ status: 'Invalid resettoken' });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            // user.resetToken = undefined; 
            await user.save();
            sendResetSuccessEmail(email);
            return res.status(200).json({ 
                status: 'Pass reset successful',
                user});
        } catch (error) {
            console.error('Error resetting password:', error);
            return res.status(500).json({ status: ' server error' });
        }
    };

    const sendResetSuccessEmail = async (email) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jkjk070070@gmail.com',
                pass: 'yyaa hjtq mjll onur',
        },
    });

        const mailOptions = {
        from: 'jkjk070070@gmail.com',
        to: email,
        subject: 'Password Reset Successful',
        text: 'Your password is reset.',
        };
        
        try {
        await transporter.sendMail(mailOptions);
        console.log('Reset success email sent successfully');
        } catch (error) {
        console.error('Error', error);
        }
    };


const alldata=async(req,res)=>{
    const data =await loginModel.find();
    res.status(200).json({
        status:'success',
        data    
    })
}

module.exports={
    createData,
    signIn,
    alldata,
    sendResetEmail,
    forgotpassword,
    resetpassword
}


// var transport = nodemailer.createTransport({
//     service :'gmail',
//     auth:{
//         user:'jkjk070070@gmail.com',
//         pass:'gnxi xpxp nisa mntc'
//     }
// });

// var mailOptions = {
//     from:'jkjk070070@gmail.com',
//     to:mail,
//     subject:'login Success',
//     text:'Your login is Successfully!'
// };

// transport.sendMail(mailOptions,function(error,info){
//     if(error){
//         console.log(error);
//     }else{
//         console.log('Email sent:'+ info.response);
//     }
// });