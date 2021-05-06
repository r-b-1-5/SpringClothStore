package lab.it.rajarshi.rajarshispring.datastore;

import java.util.List;

import lab.it.rajarshi.rajarshispring.model.DropOffPoint;

public interface DropOffPointRepository {
    
    List<DropOffPoint> getDropOffPoints();

    List<DropOffPoint> getDropOffPoints(double sourceLatitude, double sourceLongitude, int maxItems);

}
