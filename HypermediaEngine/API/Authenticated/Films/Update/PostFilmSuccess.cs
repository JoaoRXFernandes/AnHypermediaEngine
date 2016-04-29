using Hypermedia.Siren;
using Nancy;

namespace HypermediaEngine.API.Authenticated.Films.Update
{
    public class PostFilmSuccess : Entity
    {
        public PostFilmSuccess(NancyContext context) : base(context.Request.Url.ToString(), new[] { "update", "success" })
        {
        }
    }
}