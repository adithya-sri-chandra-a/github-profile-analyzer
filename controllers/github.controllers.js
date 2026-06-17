const axios = require("axios");
const db = require("../config/db.js");

exports.analyzeProfile = async (req, res) => {

    const username = req.params.username;

    try {
        console.log("token = " ,process.env.GITHUB_TOKEN)
        const response = await axios.get(
            `https://api.github.com/users/${username}`,
            {
                headers:{
                    Authorization: `token ${process.env.GITHUB_TOKEN}`
                }
            }
        );

        const repos = await axios.get(
            `https://api.github.com/users/${username}/repos`,
            {
                headers:{
                    Authorization: `token ${process.env.GITHUB_TOKEN}`
                }
            }
        );

        const data = response.data;
        const repoData = repos.data;
     

        let languages = {};
        repoData.forEach(repo => {
            if(repo.language){
                languages[repo.language] =
                (languages[repo.language] || 0) + 1;
            }
        });

        let top_language = Object.keys(languages).reduce(
            (a,b) => languages[a] > languages[b] ? a : b
        );

        const sql = `
            INSERT INTO github_profiles
            (username,name,public_repos,followers,following,account_created,profile_url,top_language)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            public_repos = VALUES(public_repos),
            followers = VALUES(followers),
            following = VALUES(following),
            account_created = VALUES(account_created),
            profile_url = VALUES(profile_url),
            top_language = VALUES(top_language)
            `;

        db.query(sql, [
            data.login,
            data.name,
            data.public_repos,
            data.followers,
            data.following,
            data.created_at.replace("T", " ").replace("Z", ""),
            data.html_url,
            top_language
        ]);

        res.json(data);

    } catch (error) {
        res.status(500).json(error);
    }
};



exports.getAllProfiles = (req, res) => {

    db.query(
        "SELECT * FROM github_profiles",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
};


exports.getSingleProfile = (req, res) => {

    const username = req.params.username;

    db.query(
        "SELECT * FROM github_profiles WHERE username=?",
        [username],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
};