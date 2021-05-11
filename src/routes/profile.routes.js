import express from 'express';
import Profile from '../models/profile';

import {
  jsonResponse,
  notFound,
  badRequest,
  serverError,
} from '../resources/responses';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();

    jsonResponse(res, 200, 'Success!!', profiles);
  } catch (error) {
    serverError(res, error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (profile) {
      jsonResponse(res, 200, 'Success!!', profile);
    } else {
      notFound(res);
    }
  } catch (error) {
    serverError(res, error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    await newProfile.save();

    jsonResponse(res, 200, 'Success!!', newProfile.fullName);
  } catch (error) {
    badRequest(res);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const newProfile = new Profile(req.body);

    const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, {
      fullName: newProfile.fullName,
      document: newProfile.document,
      phoneNumber: newProfile.phoneNumber,
      address: newProfile.address,
      updatedAt: newProfile.updatedAt,
    });

    if (updatedProfile) {
      jsonResponse(res, 200, 'Success!!', newProfile.fullName);
    } else {
      notFound(res);
    }
  } catch (error) {
    badRequest(res);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removedProfile = await Profile.findByIdAndRemove(req.params.id);

    if (removedProfile) {
      jsonResponse(res, 202, 'Success!!');
    } else {
      notFound(res);
    }
  } catch (error) {
    badRequest(res);
  }
});

export default router;
