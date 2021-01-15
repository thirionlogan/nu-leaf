const { Resolution } = require('../models');

const getAllResolutions = () =>
  Resolution.fetchAll({
    require: true,
  });

const getResolutionById = ({ id }) =>
  Resolution.where({ id }).fetch({
    withRelated: ['user'],
    require: true,
  });

const createResolution = ({ userId, content }) =>
  new Resolution({ user_id: userId, content }).save(null, {
    require: true,
    method: 'insert',
  });

const patchResolution = ({ id, content }) =>
  new Resolution({ id }).save(
    { content },
    {
      require: true,
      method: 'update',
      patch: true,
    }
  );

const deleteResolution = ({ id }) =>
  new Resolution({ id }).destroy({ require: true });

module.exports = {
  getAllResolutions,
  getResolutionById,
  createResolution,
  patchResolution,
  deleteResolution,
};
