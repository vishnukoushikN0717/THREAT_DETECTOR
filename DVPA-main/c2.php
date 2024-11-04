<?php

// Function to perform LDAP search
function ldap_search_by_username($username) {
    $ldap_conn = ldap_connect("ldap.example.com");
    ldap_bind($ldap_conn, "cn=admin,dc=example,dc=com", "password");
    $search_result = ldap_search($ldap_conn, "dc=example,dc=com", "(uid=" . $username . ")");
    $ldap_entries = ldap_get_entries($ldap_conn, $search_result);
    return $ldap_entries;
}

// Vulnerable code
$user_input = $_GET['username'];
$ldap_result = ldap_search_by_username($user_input);

?>
