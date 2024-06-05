<?php
    $riot_name = $_GET['riot_name'];
    $riot_tag = $_GET['riot_tag'];
    //il token scade ogni giorno e non lo si può richiedere tramite una api, deve essere copiato manualmente 
    $token = "RGAPI-97919b59-7e8f-4a45-9f7d-4996b599b53b";
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
