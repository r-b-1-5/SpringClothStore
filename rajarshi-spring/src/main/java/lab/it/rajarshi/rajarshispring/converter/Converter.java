package lab.it.rajarshi.rajarshispring.converter;

public interface Converter<SourceType, DestinationType> {
    
    DestinationType convert(SourceType source);

}
