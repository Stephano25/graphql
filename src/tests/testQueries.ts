// Script pour tester les requêtes
const testQueries = {
  // Login
  login: `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          name
          email
        }
      }
    }
  `,
  
  // Obtenir tous les posts avec pagination
  getPosts: `
    query GetPosts($page: Int, $limit: Int) {
      posts(page: $page, limit: $limit) {
        posts {
          id
          title
          author {
            name
          }
        }
        total
        page
        limit
        totalPages
      }
    }
  `,
  
  // Créer un post
  createPost: `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        id
        title
        content
        author {
          name
        }
      }
    }
  `,
  
  // Obtenir mon profil
  me: `
    query Me {
      me {
        id
        name
        email
        posts {
          title
          published
        }
      }
    }
  `
};

export default testQueries;