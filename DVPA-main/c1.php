<?php

// Function to perform LDAP search
function perform_ldap_search($search_query) {
    $ldap_conn = ldap_connect("ldap.example.com");
    ldap_bind($ldap_conn, "cn=admin,dc=example,dc=com", "password");
    $search_result = ldap_search($ldap_conn, "dc=example,dc=com", $search_query);
    $ldap_entries = ldap_get_entries($ldap_conn, $search_result);
    return $ldap_entries;
}

// Vulnerable code
$search_input = $_POST['search_input'];
$ldap_query = "(&(objectClass=person)(cn=" . $search_input . "))";
$ldap_result = perform_ldap_search($ldap_query);

?>

