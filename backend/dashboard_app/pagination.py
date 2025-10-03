from urllib.parse import parse_qs, urlparse
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPagination(PageNumberPagination):
    page_size = 10

    def _get_page_number_from_url(self, op, url):
        if url is None:
            return None

        query = urlparse(url).query
        params = parse_qs(query)
        page_numbers = params.get(self.page_query_param)
        if page_numbers:
            return int(page_numbers[0])
        return None

    def get_paginated_response(self, data):
        next_page_num = self._get_page_number_from_url("Next", self.get_next_link())
        prev_page_num = self._get_page_number_from_url("Prev", self.get_previous_link())
        return Response(
            {
                "count": self.page.paginator.count,
                "next": next_page_num,
                "previous": prev_page_num,
                "page_size": self.page_size,
                "total_pages": self.page.paginator.num_pages,
                "current_page_number": self.page.number,
                "results": data,
            }
        )
