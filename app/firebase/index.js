import firebase from 'firebase';

try {
    var config = {
        apiKey: "AIzaSyDm0KX7sLs-GOQqFS0sqqIu2U0pj_LkoUY",
        authDomain: "mayank-todoapp.firebaseapp.com",
        databaseURL: "https://mayank-todoapp.firebaseio.com",
        projectId: "mayank-todoapp",
        storageBucket: "mayank-todoapp.appspot.com",
        messagingSenderId: "481169471862"
    };

    firebase.initializeApp(config);
} catch (e) {

}

export var firebaseRef = firebase.database().ref();

export default firebase;