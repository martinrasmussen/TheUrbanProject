using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;

namespace DAL
{
    internal class Context : DbContext
    {
        public DbSet<Checkin> Checkins { get; set; }
        /*
         * Super constructor has the connectionString - put it here instead of app.config for no reason.
         */
        public Context()
            : base("Server=gutt2qgrg0.database.windows.net;Database=TheUrbanProject;User ID=sdmexam;Password=Easv6700;Trusted_Connection=False;") // Specified in the App.config
        {
            Database.SetInitializer<Context>(new DropCreateDatabaseIfModelChanges<Context>());
        }
    }
}
