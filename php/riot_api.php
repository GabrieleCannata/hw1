<?php
    $riot_name = $_GET['riot_name'];
    $riot_tag = $_GET['riot_tag'];
    $token = "RGAPI-c47406eb-82cd-49dd-b41f-4c653d0c7e8b";
    $url = "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/".$riot_name."/".$riot_tag;
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $headers = array("X-Riot-Token: ".$token);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    $result = curl_exec($curl);
    curl_close($curl);
    $encrypted_puuid = json_decode($result)->puuid;
    
    $url = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/".$encrypted_puuid;
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $headers = array("X-Riot-Token: ".$token);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    $result2 = curl_exec($curl);
    curl_close($curl);
    $info = array();
    array_push($info, json_decode($result2)->profileIconId, json_decode($result2)->summonerLevel);
    echo json_encode($info);
?>