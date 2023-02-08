module.exports = {
  title: {
    in: ['query'],
    optional: true,
    isLength: {
      errorMessage: 'Title can not exceed 60 chars',
      options: { max: 60 },
    },
  },
  sort: {
    in: ['query'],
    optional: true,
    notEmpty: false,
    isIn: {
      options: [['asc', 'desc']],
      errorMessage: `Invalid value, allowed values are: asc|desc`,
    },
  },
};
