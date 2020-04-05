/**
 * Parse a File assuming the rows are not inserted yet.
 * @param {File} file file documentthat comes from the database 
 */
const parseEmptyFile = (file) => {
  return {
    id: file._id,
    name: file.name,
    createdAt: file.createdAt,
    rows: [],
  };
};


/**
 * Parse a file including the rows.
 * @param {File} file File document that comes from the database 
 * @param {Data[]} rows list of Data documents that represent each one a row.  
 */
const parseFullFile = (file, rows) => {
  return {
    id: file._id,
    name: file.name,
    createdAt: file.createdAt,
    rows: rows,
  };
};

module.exports = {
  parseEmptyFile,
  parseFullFile,
};
