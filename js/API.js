'use strict';

// fetch function which we take the json data from github.
(async function getRepo() {
    const url = 'https://api.github.com/users/warpedsoftware/repos';
    $.get(url, function() {
        console.log('Fetching Github API.');
    }).done(function(data) {
        console.log('Fetching Github API is done.');
        displayRepos(data);
    }).fail(function() {
        console.log('Could not fetch the Github!');
    });


})();

//display the repos function, the first argument is the repos array which we recieve from gitgub.
async function displayRepos(data) {

    //pSI stands for project section ids
    const pSI = ['first-repo-', 'second-repo-', 'third-repo-', 'fourth-repo-', 'fifth-repo-'];
    
    for (let i = 0; i < pSI.length; i++) {
        if (data[i].id == 260480629) { continue }
        $(`#${pSI[i]}title`).html(data[i].name);
        $(`#${pSI[i]}des`).html(data[i].description);
        if (data[i].language == 'C#') {
            $(`#${pSI[i]}lang`).html(`Language: Unity/${data[i].language}`);
        } else {
            $(`#${pSI[i]}lang`).html(`Language: ${data[i].language}`);
        }
        $(`#${pSI[i]}url`).html(data[i].name);
        $(`#${pSI[i]}url`).attr('href', data[i].html_url);
    }
}

// update the github repos every once in an hour.
((updateTime) => {
    setInterval(() => {
        getRepo();
    }, updateTime);
})(3600000);
