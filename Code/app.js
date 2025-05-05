//https://api.github.com/users/${userName}
//https://api.github.com/users/${userName}/repos?per_page=5

let searchbtn  = document.querySelector('.searchbtn');
let userInp  = document.querySelector('.userInp');
let card  = document.querySelector('.card');



function getProfileData(userName){
    return fetch(`https://api.github.com/users/${userName}`)
    .then((raw)=>{
        if(!raw.ok) throw new Error('User Data Not Found');
        return raw.json();
    })
}


function getReposData(userName){
    return fetch(`https://api.github.com/users/${userName}/repos?per_page=10`)
    .then((raw)=>{
        if(!raw.ok) throw new Error('User Repos Not Found');
        return raw.json();
    })
}


function userDetailsSnippet(details,reposData){
    let data = `<!--! User Details Section -->
        <div class="mb-12 animate-fade-in">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">User Profile</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 p-6 rounded-lg border border-gray-100">
                <div class="flex flex-col items-center text-center">
                    <img 
                        src="${details.avatar_url}" 
                        alt="User Avatar" 
                        class="w-32 h-32 rounded-full border-2 border-gray-200 mb-3"
                    >
                    <h3 class="text-lg font-semibold text-gray-900">${details.name}</h3>
                    <p class="text-gray-500">@${details.login}</p>
                    <a href="${details.html_url}" target="_blank" class="text-indigo-600 hover:underline mt-2 text-sm">View Profile</a>
                </div>
                <div class="md:col-span-2 space-y-3">
                    <p><span class="font-semibold text-gray-700 mr-2">Bio:</span>${details.bio ? details.bio : "Not Available" }</p>
                    <p><span class="font-semibold text-gray-700 mr-2">Location:</span>${details.location ? details.location : "Not Available"}</p>
                    <p><span class="font-semibold text-gray-700 mr-2">Email:</span>${details.email ? details.email : "Not available"}</p>
                    <div class="flex gap-4 flex-wrap">
                        <p><span class="font-semibold text-gray-700">Followers:</span>${details.followers}</p>
                        <p><span class="font-semibold text-gray-700">Following:</span>${details.following}</p>
                        <p><span class="font-semibold text-gray-700">Public Repos:</span>${details.public_repos}</p>
                    </div>
                </div>
            </div>
        </div>

        <!--! Repositories Section -->
        <div class="animate-fade-in">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Repositories</h2>
            <div class="grid grid-cols-1 gap-5">
                <!-- Repository Card -->
                <div class="bg-white p-5 rounded-lg border border-gray-100 hover:shadow-md transition">
                    <h3 class="text-lg font-semibold text-indigo-600"><a href="${reposData[0].html_url}" class="hover:underline">${reposData[0].name}</a></h3>
                    <p class="text-gray-600 mt-1">${reposData[0].description ? reposData[0].description : "No Description" }</p>
                    <div class="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                        <p>⭐ Stars: ${reposData[0].stargazers_count}</p>
                        <p>🍴 Forks: ${reposData[0].forks}</p>
                        <p>📅 Updated: ${reposData[0].updated_at.slice(0, 10)}</p>
                        <p>💻 Language:  ${reposData[0].language}</p>
                    </div>
                </div>
                <!-- Repository Card -->
                <div class="bg-white p-5 rounded-lg border border-gray-100 hover:shadow-md transition">
                    <h3 class="text-lg font-semibold text-indigo-600"><a href="${reposData[1].html_url}" class="hover:underline">${reposData[1].name}</a></h3>
                    <p class="text-gray-600 mt-1">${reposData[1].description ? reposData[1].description : "No Description" }</p>
                    <div class="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                        <p>⭐ Stars:${reposData[1].stargazers_count}</p>
                        <p>🍴 Forks: ${reposData[1].forks}</p>
                        <p>📅 Updated: ${reposData[1].updated_at.slice(0, 10)}</p>
                        <p>💻 Language: ${reposData[1].language}</p>
                    </div>
                </div>
                <!-- Repository Card -->
                <div class="bg-white p-5 rounded-lg border border-gray-100 hover:shadow-md transition">
                    <h3 class="text-lg font-semibold text-indigo-600"><a href="${reposData[2].html_url}" class="hover:underline">${reposData[2].name}</a></h3>
                    <p class="text-gray-600 mt-1">${reposData[2].description ? reposData[2].description : "No Description" }</p>
                    <div class="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                        <p>⭐ Stars: ${reposData[2].stargazers_count}</p>
                        <p>🍴 Forks: ${reposData[2].forks}</p>
                        <p>📅 Updated: ${reposData[2].updated_at.slice(0, 10)}</p>
                        <p>💻 Language: ${reposData[2].language}</p>
                    </div>
                </div>
            </div>
        </div>`

        card.innerHTML = data;
}



searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let username = userInp.value.trim();
    getProfileData(username).then((data)=>{
        console.log(data);
        getReposData(username).then((repoData)=>{
            const shuffledRepos = repoData.sort(() => 0.5 - Math.random());
            userDetailsSnippet(data, shuffledRepos);
            console.log(shuffledRepos);
            
        })
    })
})

