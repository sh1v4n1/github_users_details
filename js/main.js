//jshint esversion:6

$(document).ready(function () {
    show('bharatagsrwal');
    $('.modal').modal();
    document.getElementById("searchbtn").addEventListener("click", searchUser);
});



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