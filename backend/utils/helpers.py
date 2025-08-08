def get_first_error(error):
    first_field = next(iter(error))
    first_error = error[first_field][0]
    return first_error
