//jshint esversion:6

$(document).ready(function () {
    show('bharatagsrwal');
    $('.modal').modal();
    document.getElementById("searchbtn").addEventListener("click", searchUser);
});

var mainData = document.getElementById("data");


function searchUser() {
    var x = document.getElementById("user").value;
    show(x);
}

function showSpinner() {
    document.getElementById("loader").classList.remove("hideLoader");
    document.getElementById("data").classList.add("hideLoader");
}

function hideSpinner() {
    document.getElementById("loader").classList.add("hideLoader");
    document.getElementById("data").classList.remove("hideLoader");
}

function show(username) {
    function loadData(username) {
        showSpinner();
        return fetch("https://api.github.com/users/" + username).then(function (response) {
            hideSpinner();
            return response.json();
        }).catch(function (error) {
            hideSpinner();
            return error;
        });
    }


    loadData(username).then(function (response) {
        if (response.login == null) {
            alert("We can't find this " + username + " Username.\nSo we are showing you Bharat's profile.\nTry to find again");
            show("bharatagsrwal");
        }
        document.getElementById("data").setAttribute("data-id", response.login);
        document.getElementById("image").src = response.avatar_url;
        document.getElementById("company").innerHTML = response.company;
        document.getElementById("name").innerHTML = response.name;
        document.getElementById("username").innerHTML = response.login;
        document.getElementById("email").innerHTML = (response.email == null) ? "Not Given (Email)" : response.email;
        document.getElementById("location").innerHTML = (response.location == null) ? '<i class="fas fa-map-marked-alt"></i> Not Given' : '<i class="fas fa-map-marked-alt"></i>' + response.location;
        document.getElementById("bio").innerHTML = (response.bio == null) ? "We Don't know " + response.login + "'s Bio" : response.bio;
        document.getElementById("repos").innerHTML = response.public_repos;
        document.getElementById("followers").innerHTML = response.followers;
        document.getElementById("following").innerHTML = response.following;
        document.getElementById("website").href = response.blog;
        document.getElementById("github").href = response.html_url;
        // document.getElementById("reposUrl").href = "https://github.com/" + response.login + "?tab=repositories";
        //document.getElementById("folURL").href = "https://github.com/"+response.login+"?tab=followers";
        // document.getElementById("follURL").href = "https://github.com/" + response.login + "?tab=following";

        document.getElementById("numberOfFollowing").textContent = response.following;
        document.getElementById("numberOfFollowers").textContent = response.followers;
        document.getElementById("numberOfRepos").textContent = response.public_repos;

    }).catch(function (error) {
        console.log(error);
    });
}



// Repos

function createRepos(element) {
    let card = document.createElement("div");
    let row = document.createElement("div");
    let tidiv = document.createElement("div");
    let h5title = document.createElement("h5");
    let des = document.createElement("p");
    let iinerdaat = document.createElement("div");
    let innerrow = document.createElement("div");
    let innerone = document.createElement("div");
    let innertwo = document.createElement("div");
    let innetthree = document.createElement("div");

    card.className = "card-panel";
    row.className = "row";
    tidiv.className = "col s12 m8";
    des.className = "grey-text";
    iinerdaat.className = "col s12 m4 center";
    innerrow.className = "row";
    innerone.className = "col m12 s4";
    innertwo.className = "col m12 s4";
    innetthree.className = "col m12 s4";

    h5title.textContent = (element.name.length > 23) ? element.name.substring(0, 23) + "..." : element.name;
    des.textContent = element.description;
    innerone.innerHTML = '<i class="material-icons">star</i><br>' + element.stargazers_count;
    innertwo.innerHTML = '<i class="material-icons">visibility</i><br>' + element.watchers;
    innetthree.innerHTML = '<i class="material-icons">call_merge</i><br>' + element.forks;


    card.appendChild(row);
    row.appendChild(tidiv);
    tidiv.appendChild(h5title);
    tidiv.appendChild(des);
    row.appendChild(iinerdaat);
    iinerdaat.appendChild(innerrow);
    innerrow.appendChild(innerone);
    innerrow.appendChild(innertwo);
    innerrow.appendChild(innetthree);
    document.getElementById("card-data-view").appendChild(card);
}

document.getElementById("reposUrl").addEventListener('click', () => {
    let id = mainData.getAttribute("data-id");
    console.log("All Repos");
    fetch("https://api.github.com/users/" + id + "/repos").then(function (response) {
        return response.json();
    }).then((response) => {
        console.log(response);
        response.forEach(element => {
            console.log(element.id);
            createRepos(element);
        });
    }).catch(function (error) {
        return error;
    });
});

//Followers
document.getElementById("followersURL").addEventListener('click', () => {
    let id = mainData.getAttribute("data-id");
    console.log("followersURL");
    fetch("https://api.github.com/users/" + id + "/followers").then(function (response) {
        return response.json();
    }).then((response) => {
        console.log(response);
    }).catch(function (error) {
        return error;
    });
});

// Followings
document.getElementById("followingURL").addEventListener('click', () => {
    let id = mainData.getAttribute("data-id");
    console.log(id);
    fetch("https://api.github.com/users/" + id + "/following").then(function (response) {
        return response.json();
    }).then((response) => {
        console.log(response);
    }).catch(function (error) {
        return error;
    });
});