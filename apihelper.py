from census import Census

API_KEY = "32e797a32ba6e8830a02ac4a88804ec08124e470"
c = Census(API_KEY)

def get_med_inc_nonfamily(zipcode):
    """
    Returns the median income in a given zip code for
    non-family (1-2) person households.
        requires:
            - zipcode to be the string form of a valid zipcode.
        returns: 
            - An integer representing the median income for Nonfamily individuals.
            - -1 if input invalid or other error occurred
    """

    # The table lookup corresponding to the data that we want.
    table_code = 'B19202_001E'

    # Return value is a list of dictionary.
    api_return = c.acs5.zipcode((table_code), zipcode, state_fips = 0)

    # If we have an invalid entry, give average for US.
    if (len(api_return) == 0):
        api_return = c.acs5.us((table_code))
    
    # Unwrap the api value 
    ret = api_return[0][table_code]
    return ret

def get_med_inc_family(zipcode):
    """
    Returns the median income in a given zip code for
    family (3+) person households.
        requires:
            - zipcode to be the string form of a valid zipcode.
        returns: 
            - An integer representing the median income for Nonfamily individuals.
            - -1 if input invalid or other error occurred
    """
    
    # The table lookup corresponding to the data that we want.
    table_code = 'B19013_001E'

    # Return value is a list of dictionary.
    api_return = c.acs5.zipcode((table_code), zipcode, state_fips = 0)

    # If we have an invalid zipcode, give average for US.
    if (len(api_return) == 0):
        api_return = c.acs5.us((table_code))
    
    # Unwrap the api value 
    ret = api_return[0][table_code]
    return ret

print(get_med_inc_nonfamily('02446'))
print(get_med_inc_family('00000'))
