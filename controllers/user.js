const express = require('express')

const User = require('../models/user')
const path = require('path')

exports.getAppointmentForm = (req, res, next) => {
    console.log('entered into getHomePageController')
    res.sendFile(path.join(__dirname, '../', 'views/index.html'))
}

exports.getAllAppointments = (req, res, next) => {
    User.findAll()
        .then((result) => {
            res.json(result)

        })
}

exports.postVerifyUser = (req, res, next) => {
    console.log('entered into postVerifyUser controller')

    let username = req.body.username;
    let email = req.body.email
    let phoneNumber = req.body.phoneNumber


    User.findAll({ where: { email: email } })
        .then((result) => {
            console.log(result)
            res.json(result)
        })
}


exports.postBookAppointment = (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email
    let phoneNumber = req.body.phoneNumber

    User.create({
        username: username,
        email: email,
        phoneNumber: phoneNumber
    })
        .then((result) => {
            console.log('USER DETAILS SAVED TO DATABASE SUCCESSFULLY')
            res.json(result)

        })
        .catch((error) => {
            console.log(error)
        })

}

exports.getUpdateUser = (req, res, next) => {
    const id = req.params.id;
    User.findByPk(id)
        .then((response) => {
            response.username = req.body.username;
            response.phoneNumber = req.body.phoneNumber;
            response.save();
            res.json(response);
        })
}

exports.postDeleteAppointment = async (req, res, next) => {
    try {
        console.log('inside postDeleteAppointment controller')
        const appointmentId = req.body.id;
        const appointment = await User.findByPk(appointmentId)
        console.log(appointment)
        await appointment.destroy();
        res.redirect('/');

    } catch {
        (error) => {
            console.log(error)
        }
    }

}
exports.getDeleteAppointment = async (req, res, next) => {
    try {
        console.log('inside postDeleteAppointment controller')
        const appointmentId = req.params.id;
        const appointment = await User.findByPk(appointmentId)
        console.log(appointment)
        await appointment.destroy();
        res.json()

    } catch {
        (error) => {
            console.log(error)
        }
    }

}

exports.getEditAppointment = async (req, res, next) => {
    try {
        console.log('inside postEditAppointment controller')
        const appointmentId = req.params.id
        const appointment = await User.findByPk(appointmentId)
        console.log(appointment)
        res.json(appointment)

    } catch {
        (error) => {
            console.log(error)
        }
    }
}


