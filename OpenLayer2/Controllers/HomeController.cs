using OpenLayer2.Models;
using System.Linq;
using System.Web.Mvc;

namespace OpenLayer2.Controllers
{
    public class HomeController : Controller
    {
        private TuyenQuangEntities marker = new TuyenQuangEntities();

        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Marker()
        {
            var point = marker.Marker.ToList();
            //var point = (from p in db_TQArcGIS.Info_POI where p.TinhId == 50 select p).Take(1000).ToList();
            //var point = db_TQArcGIS.Info_POI.Take(1000).ToList();
            return Json(point, JsonRequestBehavior.AllowGet);
        }
    }
}