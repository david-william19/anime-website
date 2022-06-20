import { gql } from '@apollo/client'

// get anime
const GET_ALL_ANIME = gql`
query($pageNumber: Int!){
    Page(page: $pageNumber, perPage:12) {
    pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
		media{
            id,
            title {
                romaji
                english
            },
            description,
            episodes,
            season,
            status,
            type,
            coverImage {
                large
                medium
                color
            }
      }
	}
}
`;

// get anime by id
const GET_ANIME_BY_ID = gql`
query($id: Int){
		Media(id: $id){
      id,
      title {
        romaji
        english
      },
      description,
      episodes,
      season,
      status,
      type,
      coverImage {
        large
        medium
        color
      }
    }
}
`

export {
    GET_ALL_ANIME,
    GET_ANIME_BY_ID
}