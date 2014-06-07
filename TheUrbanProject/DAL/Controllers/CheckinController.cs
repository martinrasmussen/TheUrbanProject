using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;

namespace DAL.Controllers
{
    public class CheckinController
    {
        public bool AddCheckin(Checkin checkin)
        {
            using (Context objContext = new Context())  // Creating the context
            {
                using (var dbContextTransaction = objContext.Database.BeginTransaction()) // Starting the transaction
                {
                    try
                    {
                        objContext.Checkins.Add(checkin); // Adding to the database

                        objContext.SaveChanges(); // Saving the changes made to the database

                        dbContextTransaction.Commit(); // Commiting the transaction

                        return true; // Successfull operation
                    }
                    catch (Exception) // In case of error
                    {
                        dbContextTransaction.Rollback(); // Rolling back the database to a state prior of the changes
                        return false; // Unsuccessfull
                    }
                }
            }
        }

        public List<Checkin> GetCheckinsForLAstHour()
        {
            using (Context objContext = new Context()) // Entity framework requirement
            {
                try
                {
                    DateTime oneHourAgo = new DateTime().AddHours(-1);

                    var res = (from c in objContext.Checkins.ToList()
                        where c.Time >= oneHourAgo
                        select c).ToList();

                    return res;

                }
                catch (Exception)
                {
                    return new List<Checkin>();
                }
            }
        }

        public List<Checkin> GetAllCheckins(string city, string state)
        {
            using (Context objContext = new Context()) // Entity framework requirement
            {
                try
                {
                    DateTime oneHourAgo = new DateTime().AddHours(-1);

                    var res = (from c in objContext.Checkins.ToList()
                               where c.City == city && c.State == state && c.Time >= oneHourAgo
                               select c).ToList();

                    return res;
                }
                catch (Exception)
                {
                    return new List<Checkin>();
                }
            }
        }
    }
}
