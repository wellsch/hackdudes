import censusapi as census


class User:
    """
    Simple class representation of a single user's information and data. 
    For the purposes of transmission to front-end.
    Fields include:
    self.income
    self.zipcode
    self.rent_ratio -- the percentage of income to be used on rent.
    """

    def __init__(self, income, zipcode, age=0, actual_rent=0):
        """
        A constructor for an instance of the user class.
        Requires:
            - income: a positive integer representing monthly income.
            - zipcode: the zipcode of the user's residence.
        """
        self.income = income
        self.zipcode = zipcode
        self.age = age
        self.actual_rent = actual_rent
        self.rent_ratio = 0.3

    def ideal_rent(self):
        """
        A function to return the ideal rent for a user 
        based on their income.
        Requires: None
        Returns: A float representing the ideal rent as 
            in dollars.
        """
        return self.income * self.rent_ratio

    def median_rent(self):
        """
        A function which returns the median rent 
        """
        return census.get_med_rent(self.zipcode)
