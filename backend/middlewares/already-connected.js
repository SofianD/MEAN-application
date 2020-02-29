const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>  {
                                        try {
                                          const token = req.headers.authorization.split(' ')[1];
                                          if(token === 'null' || token === 'undefined') {
                                            next();
                                          }else {
                                            res.status(500).json({ message: 'Already connected' });
                                          }
                                        }
                                        catch (e) {
                                          console.log('alreadyConnect file: error', e);
                                          res.status(500).json({ message: 'alreadyConnect file:je stoppe le script' });
                                        }
                                      };
