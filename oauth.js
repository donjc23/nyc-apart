var ids = {
facebook: {
 clientID: '642108929180162',
 clientSecret: 'a0d6f8b177e56b72f97c33fffad8e081',
 callbackURL: 'http://127.0.0.1:3000/auth/facebook/callback'
},
twitter: {
 consumerKey: 'vZV7avN1XxbA1nyJF74dIw',
 consumerSecret: 'lK796HVGw1SfNIOmf28SMDgaRZqHjPPwvN1jjQCvN4c',
 callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
},
google: {
 returnURL: 'http://127.0.0.1:3000/auth/google/callback',
 realm: 'http://127.0.0.1:3000'
}
}

module.exports = ids;